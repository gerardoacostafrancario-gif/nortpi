export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { items, total, pedido_id, comercio } = req.body;
    const preference = {
      items: items.map(i => ({
        title: i.nombre || i.title || 'Producto',
        quantity: parseInt(i.qty || i.quantity || 1),
        unit_price: parseFloat(i.precio || i.unit_price || 0),
        currency_id: 'ARS'
      })),
      back_urls: {
        success: 'https://puertaapuerta.vercel.app/pago.html?status=approved',
        failure: 'https://puertaapuerta.vercel.app/pago.html?status=failure',
        pending: 'https://puertaapuerta.vercel.app/pago.html?status=pending',
      },
      auto_return: 'approved',
      statement_descriptor: 'PUERTA A PUERTA',
      external_reference: pedido_id || Date.now().toString(),
    };

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer APP_USR-5574134103320398-040510-f136a745dc822a801c81ca4893b43e1e-3313856142`
      },
      body: JSON.stringify(preference)
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || 'Error MP');
    res.status(200).json({ id: data.id, init_point: data.init_point });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
