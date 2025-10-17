import { getApperClient } from "@/services/apperClient";

export const getStudents = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "class_c" } },
        { field: { Name: "science_marks_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "photo_c" } },
        { field: { Name: "parent_contact_name_c" } },
        { field: { Name: "parent_contact_phone_c" } },
        { field: { Name: "parent_contact_email_c" } },
        { field: { Name: "enrollment_date_c" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("student_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching students:", error?.response?.data?.message || error);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "class_c" } },
        { field: { Name: "science_marks_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "photo_c" } },
        { field: { Name: "parent_contact_name_c" } },
        { field: { Name: "parent_contact_phone_c" } },
        { field: { Name: "parent_contact_email_c" } },
        { field: { Name: "enrollment_date_c" } }
      ]
    };
    
    const response = await apperClient.getRecordById("student_c", parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching student ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const createStudent = async (studentData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          first_name_c: studentData.firstName,
          last_name_c: studentData.lastName,
          email_c: studentData.email,
          phone_c: studentData.phone,
          grade_level_c: studentData.gradeLevel,
          class_c: studentData.class,
          science_marks_c: studentData.scienceMarks ? parseInt(studentData.scienceMarks) : null,
          status_c: studentData.status,
          photo_c: studentData.photo,
          parent_contact_name_c: studentData.parentContact?.name,
          parent_contact_phone_c: studentData.parentContact?.phone,
          parent_contact_email_c: studentData.parentContact?.email,
          enrollment_date_c: studentData.enrollmentDate || new Date().toISOString().split('T')[0]
        }
      ]
    };
    
    const response = await apperClient.createRecord("student_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create student:`, failed);
        throw new Error(failed[0].message || "Failed to create student");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error?.response?.data?.message || error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          Id: parseInt(id),
          first_name_c: studentData.firstName,
          last_name_c: studentData.lastName,
          email_c: studentData.email,
          phone_c: studentData.phone,
          grade_level_c: studentData.gradeLevel,
          class_c: studentData.class,
          science_marks_c: studentData.scienceMarks ? parseInt(studentData.scienceMarks) : null,
          status_c: studentData.status,
          photo_c: studentData.photo,
          parent_contact_name_c: studentData.parentContact?.name,
          parent_contact_phone_c: studentData.parentContact?.phone,
          parent_contact_email_c: studentData.parentContact?.email,
          enrollment_date_c: studentData.enrollmentDate
        }
      ]
    };
    
    const response = await apperClient.updateRecord("student_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update student:`, failed);
        throw new Error(failed[0].message || "Failed to update student");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error?.response?.data?.message || error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("student_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete student:`, failed);
        throw new Error(failed[0].message || "Failed to delete student");
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting student:", error?.response?.data?.message || error);
    throw error;
  }
};