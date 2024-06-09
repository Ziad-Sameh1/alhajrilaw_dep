import {
  addCheckpoint,
  deleteCheckpoint,
  getCheckpointByEmail,
  getCheckpointEmail,
  getCheckpoints,
  getCheckpointStats,
  getSenderCheckpoints,
  logout,
  updateCheckpoint,
} from "../../../services/CheckpointService";

export const GetUserCheckpoints = async (email, entitySetter, size, num, t) => {
  const res = await getSenderCheckpoints(email, size, num, t);
  entitySetter(res);
};