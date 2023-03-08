export function pickOrderSortByXYZO(data = {}) {
  const _postdata = [];
  const x = [];
  const y = [];
  const z = [];
  const o = [];
  for (let i = 0, _i = data.detailVos?.length || 0; i < _i; i++) {
    const itm = data.detailVos[i];
    if (itm.arrangeShelfCode[0] === 'X') {
      x.push({ ...itm });
      continue;
    }
    if (itm.arrangeShelfCode[0] === 'Y') {
      y.push({ ...itm });
      continue;
    }
    if (itm.arrangeShelfCode[0] === 'Z') {
      z.push({ ...itm });
      continue;
    }
    o.push({ ...itm });
  }
  if (x.length) {
    _postdata.push({
      ...data,
      detailVos: x,
    });
  }
  if (y.length) {
    _postdata.push({
      ...data,
      detailVos: y,
    });
  }
  if (z.length) {
    _postdata.push({
      ...data,
      detailVos: z,
    });
  }
  if (o.length) {
    _postdata.push({
      ...data,
      detailVos: o,
    });
  }

  return _postdata;
}
