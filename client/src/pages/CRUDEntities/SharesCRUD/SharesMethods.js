import {
  addShare,
  updateShare,
  getShares,
  getSharesByName,
  getSharesStats,
  deleteShare,
  deleteAllShares,
  getShareByLink,
} from "../../../services/SharesService";

export const GetShares = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getShares(size, num, t);
  entitySetter(res);
};

export const GetSharesStats = async (numericSetter, graphSetter, t) => {
  const res = await getSharesStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      shares: res.monthly[0],
    },
    {
      name: t("february"),
      shares: res.monthly[1],
    },
    {
      name: t("march"),
      shares: res.monthly[2],
    },
    {
      name: t("april"),
      shares: res.monthly[3],
    },
    {
      name: t("may"),
      shares: res.monthly[4],
    },
    {
      name: t("june"),
      shares: res.monthly[5],
    },
    {
      name: t("july"),
      shares: res.monthly[6],
    },
    {
      name: t("august"),
      shares: res.monthly[7],
    },
    {
      name: t("september"),
      shares: res.monthly[8],
    },
    {
      name: t("october"),
      shares: res.monthly[9],
    },
    {
      name: t("november"),
      shares: res.monthly[10],
    },
    {
      name: t("december"),
      shares: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetSharesByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getSharesByName(name, t);
  entitySetter(res);
};

export const GetShareByLink = async (dataSetter, link, t) => {
  const res = await getShareByLink(link, t);
  dataSetter(res);
};

export const AddShares = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addShare(item, t);
  await GetShares(entitySetter, size, num, t);
  await GetSharesStats(numericSetter, graphSetter, t);
};

export const UpdateShares = async (item, entitySetter, size, num, t) => {
  await updateShare(item, t);
  await GetShares(entitySetter, size, num, t);
};

export const Delete = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await deleteShare(item._id, t);
  await GetShares(entitySetter, size, num, t);
  await GetSharesStats(numericSetter, graphSetter, t);
};

export const DeleteAll = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await deleteAllShares(item._id, t);
  await GetShares(entitySetter, size, num, t);
  await GetSharesStats(numericSetter, graphSetter, t);
};
