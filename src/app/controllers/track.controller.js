import BaseController from "../../common/base.controller.js";
import CreateTrackRequest from "../requests/create-track.request.js";
import TrackService from "../services/track.service.js";

class TrackController extends BaseController {
  constructor() {
    super();
  }

  getAllTracks = this.asyncHandler(async (req, res) => {
    const tracks = await TrackService.getTracks();
    this.sendResponse(res, tracks, "Tracks retrieved successfully");
  });

  getTrackById = this.asyncHandler(async (req, res) => {
    const track = await TrackService.getTrack(req.params.id);
    this.sendResponse(res, track, "Track retrieved successfully");
  });

  createTrack = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateTrackRequest(req);
    const payload = await requestValidator.validate();
    const track = await TrackService.createTrack(payload);
    this.sendResponse(res, track, "Track created successfully", 201);
  });

  updateTrack = this.asyncHandler(async (req, res) => {
    const requestValidator = new CreateTrackRequest(req);
    const payload = await requestValidator.validate();
    const track = await TrackService.updateTrack(req.params.id, payload);
    this.sendResponse(res, track, "Track updated successfully");
  });

  deleteTrack = this.asyncHandler(async (req, res) => {
    await TrackService.deleteTrack(req.params.id);
    this.sendResponse(res, null, "Track deleted successfully");
  });
}

export default TrackController;
