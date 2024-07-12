import {
  addCheckpoint,
  deleteCheckpoint,
  getCheckpointByEmail,
  getCheckpointEmail,
  getCheckpoints,
  getCheckpointsReport,
  getCheckpointStats,
  getSenderCheckpoints,
  logout,
  updateCheckpoint,
} from "../../../services/CheckpointService";

export const GetUserCheckpoints = async (email, entitySetter, size, num, t) => {
  const res = await getSenderCheckpoints(email, size, num, t);
  entitySetter(res.checkpoints);
};

export const GetReportCheckpoints = async (
  entitySetter,
  size,
  num,
  startDate,
  endDate,
  email,
  t
) => {
  const res = await getCheckpointsReport(size, num, startDate, endDate, email, t);
  entitySetter(res.checkpoints);
};
