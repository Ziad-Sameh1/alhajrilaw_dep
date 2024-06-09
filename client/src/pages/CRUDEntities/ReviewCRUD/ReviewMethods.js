import {
  addReview,
  updateReview,
  getReviews,
  getReviewsByName,
  getReviewsStats,
  deleteReview,
  deleteAllReviews,
} from "../../../services/ReviewService";

export const GetReviews = async (entitySetter, size, num, t) => {
  console.log(`size: ${size}, num: ${num}`);
  const res = await getReviews(size, num, t);
  entitySetter(res);
};

export const GetReviewsStats = async (numericSetter, graphSetter, t) => {
  const res = await getReviewsStats(t);
  numericSetter({ all: res.all, month: res.month, day: res.day });
  const graph = [
    {
      name: t("january"),
      reviews: res.monthly[0],
    },
    {
      name: t("february"),
      reviews: res.monthly[1],
    },
    {
      name: t("march"),
      reviews: res.monthly[2],
    },
    {
      name: t("april"),
      reviews: res.monthly[3],
    },
    {
      name: t("may"),
      reviews: res.monthly[4],
    },
    {
      name: t("june"),
      reviews: res.monthly[5],
    },
    {
      name: t("july"),
      reviews: res.monthly[6],
    },
    {
      name: t("august"),
      reviews: res.monthly[7],
    },
    {
      name: t("september"),
      reviews: res.monthly[8],
    },
    {
      name: t("october"),
      reviews: res.monthly[9],
    },
    {
      name: t("november"),
      reviews: res.monthly[10],
    },
    {
      name: t("december"),
      reviews: res.monthly[11],
    },
  ];
  graphSetter(graph);
};

export const GetReviewsByName = async (
  entitySetter,
  searchFieldSetter,
  name,
  t
) => {
  searchFieldSetter(name);
  const res = await getReviewsByName(name, t);
  entitySetter(res);
};

export const AddReviews = async (
  item,
  entitySetter,
  numericSetter,
  graphSetter,
  size,
  num,
  t
) => {
  await addReview(item, t);
  await GetReviews(entitySetter, size, num, t);
  await GetReviewsStats(numericSetter, graphSetter, t);
};

export const UpdateReviews = async (item, entitySetter, size, num, t) => {
  await updateReview(item, t);
  await GetReviews(entitySetter, size, num, t);
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
  await deleteReview(item._id, t);
  await GetReviews(entitySetter, size, num, t);
  await GetReviewsStats(numericSetter, graphSetter, t);
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
  await deleteAllReviews(item._id, t);
  await GetReviews(entitySetter, size, num, t);
  await GetReviewsStats(numericSetter, graphSetter, t);
};
