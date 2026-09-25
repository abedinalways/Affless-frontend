"use client";

import { useState, useCallback } from "react";
import { useGetJobsQuery, useGetJobDetailsQuery, usePostJobMutation, useUpdateJobMutation, useDeleteJobMutation } from "@/lib/redux/features/jobs/jobsApi";
import { Job } from "@/types/job.types";
import toast from "react-hot-toast";

interface UseJobsOptions {
  itemsPerPage?: number;
}

export const useJobs = ({ itemsPerPage = 10 }: UseJobsOptions = {}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data, isLoading, refetch } = useGetJobsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
  });

  const [postJobMutation] = usePostJobMutation();
  const [updateJobMutation] = useUpdateJobMutation();
  const [deleteJobMutation] = useDeleteJobMutation();

  const jobs = data?.data || [];
  const totalJobs = data?.meta_data?.total || 0;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleViewJob = useCallback((job: Job) => {
    setSelectedJob(job);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedJob(null);
  }, []);

  const handlePostJob = useCallback(
    async (jobData: Record<string, unknown>) => {
      try {
        await postJobMutation(jobData).unwrap();
        toast.success("Job posted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to post job");
      }
    },
    [postJobMutation, refetch]
  );

  const handleUpdateJob = useCallback(
    async (id: string, jobData: Record<string, unknown>) => {
      try {
        await updateJobMutation({ id, data: jobData }).unwrap();
        toast.success("Job updated successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to update job");
      }
    },
    [updateJobMutation, refetch]
  );

  const handleDeleteJob = useCallback(
    async (job: Job) => {
      try {
        await deleteJobMutation(job.id).unwrap();
        toast.success("Job deleted");
        refetch();
      } catch (err) {
        toast.error("Failed to delete job");
      }
    },
    [deleteJobMutation, refetch]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    jobs,
    totalJobs,
    searchQuery,
    currentPage,
    totalPages,
    selectedJob,
    isLoading,
    handleSearch,
    handleViewJob,
    handleCloseDetail,
    handlePostJob,
    handleUpdateJob,
    handleDeleteJob,
    handlePageChange,
  };
};