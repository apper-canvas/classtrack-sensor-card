import { getApperClient } from "@/services/apperClient";
import React from "react";
import Error from "@/components/ui/Error";

export const getClasses = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "name_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "teacher_c" } },
        { field: { Name: "schedule_c" } },
        { field: { Name: "room_c" } },
        { field: { Name: "capacity_c" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("class_item_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching classes:", error?.response?.data?.message || error);
    return [];
  }
};

export const getClassById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "name_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "teacher_c" } },
        { field: { Name: "schedule_c" } },
        { field: { Name: "room_c" } },
        { field: { Name: "capacity_c" } }
      ]
    };
    
    const response = await apperClient.getRecordById("class_item_c", parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching class ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const createClass = async (classData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          name_c: classData.name,
          subject_c: classData.subject,
          grade_level_c: classData.gradeLevel ? parseInt(classData.gradeLevel) : null,
          teacher_c: classData.teacher,
          schedule_c: classData.schedule,
          room_c: classData.room,
          capacity_c: classData.capacity ? parseInt(classData.capacity) : null
        }
      ]
    };
    
    const response = await apperClient.createRecord("class_item_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create class:`, failed);
        throw new Error(failed[0].message || "Failed to create class");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating class:", error?.response?.data?.message || error);
    throw error;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          Id: parseInt(id),
          name_c: classData.name,
          subject_c: classData.subject,
          grade_level_c: classData.gradeLevel ? parseInt(classData.gradeLevel) : null,
          teacher_c: classData.teacher,
          schedule_c: classData.schedule,
          room_c: classData.room,
          capacity_c: classData.capacity ? parseInt(classData.capacity) : null
        }
      ]
    };
    
    const response = await apperClient.updateRecord("class_item_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update class:`, failed);
        throw new Error(failed[0].message || "Failed to update class");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error?.response?.data?.message || error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("class_item_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete class:`, failed);
        throw new Error(failed[0].message || "Failed to delete class");
      }
    }
    
return true;
  } catch (error) {
    console.error("Error deleting class:", error?.response?.data?.message || error);
    throw error;
  }
};