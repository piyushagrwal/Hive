import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs});
}

export const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

export const getJob = async (req,res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({job});
}

export const updateJob = async (req,res) => {
    const {company , position} = req.body;
    if(!company || !position){
        return res.status(400).json({message: "Please provide company and position"});
    }
    const job = await Job.findByIdAndUpdate(req.params.id , req.body , {new:true});
    res.status(StatusCodes.OK).json({message:"Job Modified",job});
}

export const deleteJob = async (req,res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({message:"Job Deleted successfully",job});
}

