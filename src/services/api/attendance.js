import { getApperClient } from "@/services/apperClient";

export const getAttendance = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "notes_c" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("attendance_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching attendance:", error?.response?.data?.message || error);
    return [];
  }
};

export const getAttendanceById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "notes_c" } }
      ]
    };
    
    const response = await apperClient.getRecordById("attendance_c", parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching attendance ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getAttendanceByStudentId = async (studentId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "notes_c" } }
      ],
      where: [
        {
          FieldName: "student_id_c",
          Operator: "EqualTo",
          Values: [parseInt(studentId)]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords("attendance_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching attendance for student ${studentId}:`, error?.response?.data?.message || error);
    return [];
  }
};

export const createAttendance = async (attendanceData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          student_id_c: parseInt(attendanceData.studentId),
          date_c: attendanceData.date,
          status_c: attendanceData.status,
          notes_c: attendanceData.notes
        }
      ]
    };
    
    const response = await apperClient.createRecord("attendance_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create attendance:`, failed);
        throw new Error(failed[0].message || "Failed to create attendance");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating attendance:", error?.response?.data?.message || error);
    throw error;
  }
};

export const updateAttendance = async (id, attendanceData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          Id: parseInt(id),
          student_id_c: parseInt(attendanceData.studentId),
          date_c: attendanceData.date,
          status_c: attendanceData.status,
          notes_c: attendanceData.notes
        }
      ]
    };
    
    const response = await apperClient.updateRecord("attendance_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update attendance:`, failed);
        throw new Error(failed[0].message || "Failed to update attendance");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating attendance:", error?.response?.data?.message || error);
    throw error;
  }
};

export const deleteAttendance = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("attendance_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete attendance:`, failed);
        throw new Error(failed[0].message || "Failed to delete attendance");
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting attendance:", error?.response?.data?.message || error);
    throw error;
  }
};