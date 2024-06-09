import {
  addReviewCode,
  updateReviewCode,
  getReviewCodes,
  getReviewCodesByName,
  getReviewCodesStats,
  deleteReviewCode,
  deleteAllReviewCodes,
} from "../../../services/ReviewCodeService";

export const GetReviewCodes = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getReviewCodes(size, num, t);
  entitySetter(res);
};

export const GetReviewCodesStats = async (numericSetter, graphSetter, t) => {
  const res = await getReviewCodesStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      reviewCodes: res.monthly[0],
    },
    {
      name: t("february"),
      reviewCodes: res.monthly[1],
    },
    {
      name: t("march"),
      reviewCodes: res.monthly[2],
    },
    {
      name: t("april"),
      reviewCodes: res.monthly[3],
    },
    {
      name: t("may"),
      reviewCodes: res.monthly[4],
    },
    {
      name: t("june"),
      reviewCodes: res.monthly[5],
    },
    {
      name: t("july"),
      reviewCodes: res.monthly[6],
    },
    {
      name: t("august"),
      reviewCodes: res.monthly[7],
    },
    {
      name: t("september"),
      reviewCodes: res.monthly[8],
    },
    {
      name: t("october"),
      reviewCodes: res.monthly[9],
    },
    {
      name: t("november"),
      reviewCodes: res.monthly[10],
    },
    {
      name: t("december"),
      reviewCodes: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetReviewCodesByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getReviewCodesByName(name, t);
  entitySetter(res);
};

export const AddReviewCodes = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addReviewCode(item, t);
  await GetReviewCodes(entitySetter, size, num, t);
  await GetReviewCodesStats(numericSetter, graphSetter, t);
};

export const UpdateReviewCodes = async (item, entitySetter, size, num, t) => {
  await updateReviewCode(item, t);
  await GetReviewCodes(entitySetter, size, num, t);
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
  await deleteReviewCode(item._id, t);
  await GetReviewCodes(entitySetter, size, num, t);
  await GetReviewCodesStats(numericSetter, graphSetter, t);
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
  await deleteAllReviewCodes(item._id, t);
  await GetReviewCodes(entitySetter, size, num, t);
  await GetReviewCodesStats(numericSetter, graphSetter, t);
};
