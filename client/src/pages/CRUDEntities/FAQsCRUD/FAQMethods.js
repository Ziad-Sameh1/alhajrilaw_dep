import {
  addFAQ,
  updateFAQ,
  getFAQs,
  getFAQsByName,
  getFAQsStats,
  deleteFAQ,
  deleteAllFAQs,
} from "../../../services/FAQService";

export const GetFAQs = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getFAQs(size, num, t);
  entitySetter(res);
};

export const GetFAQsStats = async (numericSetter, graphSetter, t) => {
  const res = await getFAQsStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      faqs: res.monthly[0],
    },
    {
      name: t("february"),
      faqs: res.monthly[1],
    },
    {
      name: t("march"),
      faqs: res.monthly[2],
    },
    {
      name: t("april"),
      faqs: res.monthly[3],
    },
    {
      name: t("may"),
      faqs: res.monthly[4],
    },
    {
      name: t("june"),
      faqs: res.monthly[5],
    },
    {
      name: t("july"),
      faqs: res.monthly[6],
    },
    {
      name: t("august"),
      faqs: res.monthly[7],
    },
    {
      name: t("september"),
      faqs: res.monthly[8],
    },
    {
      name: t("october"),
      faqs: res.monthly[9],
    },
    {
      name: t("november"),
      faqs: res.monthly[10],
    },
    {
      name: t("december"),
      faqs: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetFAQsByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getFAQsByName(name, t);
  entitySetter(res);
};

export const AddFAQs = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addFAQ(item, t);
  await GetFAQs(entitySetter, size, num, t);
  await GetFAQsStats(numericSetter, graphSetter, t);
};

export const UpdateFAQs = async (item, entitySetter, size, num, t) => {
  await updateFAQ(item, t);
  await GetFAQs(entitySetter, size, num, t);
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
  await deleteFAQ(item._id, t);
  await GetFAQs(entitySetter, size, num, t);
  await GetFAQsStats(numericSetter, graphSetter, t);
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
  await deleteAllFAQs(item._id, t);
  await GetFAQs(entitySetter, size, num, t);
  await GetFAQsStats(numericSetter, graphSetter, t);
};
