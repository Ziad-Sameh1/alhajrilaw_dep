import {
  addPage,
  updatePage,
  getPages,
  getPagesByName,
  getPagesStats,
  deletePage,
  deleteAllPages,
} from "../../../services/WebPagesService";

export const GetPages = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getPages(size, num, t);
  entitySetter(res);
};

export const GetPagesStats = async (numericSetter, graphSetter, t) => {
  const res = await getPagesStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      pages: res.monthly[0],
    },
    {
      name: t("february"),
      pages: res.monthly[1],
    },
    {
      name: t("march"),
      pages: res.monthly[2],
    },
    {
      name: t("april"),
      pages: res.monthly[3],
    },
    {
      name: t("may"),
      pages: res.monthly[4],
    },
    {
      name: t("june"),
      pages: res.monthly[5],
    },
    {
      name: t("july"),
      pages: res.monthly[6],
    },
    {
      name: t("august"),
      pages: res.monthly[7],
    },
    {
      name: t("september"),
      pages: res.monthly[8],
    },
    {
      name: t("october"),
      pages: res.monthly[9],
    },
    {
      name: t("november"),
      pages: res.monthly[10],
    },
    {
      name: t("december"),
      pages: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetPagesByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getPagesByName(name, t);
  entitySetter(res);
};

export const AddPages = async (item, t) => {
  await addPage(item, t);
};

export const UpdatePages = async (item, t) => {
  await updatePage(item, t);
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
  await deletePage(item._id, t);
  await GetPages(entitySetter, size, num, t);
  await GetPagesStats(numericSetter, graphSetter, t);
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
  await deleteAllPages(item._id, t);
  await GetPages(entitySetter, size, num, t);
  await GetPagesStats(numericSetter, graphSetter, t);
};
