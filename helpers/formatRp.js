function formatRp(value){
  return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'}).format(value);
}

module.exports = formatRp;
