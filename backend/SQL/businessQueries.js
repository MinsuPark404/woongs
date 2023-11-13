module.exports = {
  createBusinessQuery: `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  getAllBusinessesQuery: `SELECT * FROM cms_businesses`,
  updateBusinessQuery: `UPDATE cms_businesses SET business_name = ?, business_admin = ?, business_tel = ?, business_addr1 = ?, business_addr2 = ?, business_bno = ?, business_url = ? WHERE business_id = ?`,
  deleteBusinessQuery: `DELETE FROM cms_businesses WHERE business_id = ?`,
};
