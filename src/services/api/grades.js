import { getApperClient } from "@/services/apperClient";

export const getGrades = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "category_c" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("grade_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching grades:", error?.response?.data?.message || error);
    return [];
  }
};

export const getGradeById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "category_c" } }
      ]
    };
    
    const response = await apperClient.getRecordById("grade_c", parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching grade ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getGradesByStudentId = async (studentId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "category_c" } }
      ],
      where: [
        {
          FieldName: "student_id_c",
          Operator: "EqualTo",
          Values: [parseInt(studentId)]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords("grade_c", params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching grades for student ${studentId}:`, error?.response?.data?.message || error);
    return [];
  }
};

export const createGrade = async (gradeData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          student_id_c: parseInt(gradeData.studentId),
          subject_c: gradeData.subject,
          assignment_c: gradeData.assignment,
          score_c: parseFloat(gradeData.score),
          max_score_c: parseFloat(gradeData.maxScore),
          date_c: gradeData.date,
          category_c: gradeData.category
        }
      ]
    };
    
    const response = await apperClient.createRecord("grade_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create grade:`, failed);
        throw new Error(failed[0].message || "Failed to create grade");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating grade:", error?.response?.data?.message || error);
    throw error;
  }
};

export const updateGrade = async (id, gradeData) => {
  try {
    const apperClient = getApperClient();
    const params = {
      records: [
        {
          Id: parseInt(id),
          student_id_c: parseInt(gradeData.studentId),
          subject_c: gradeData.subject,
          assignment_c: gradeData.assignment,
          score_c: parseFloat(gradeData.score),
          max_score_c: parseFloat(gradeData.maxScore),
          date_c: gradeData.date,
          category_c: gradeData.category
        }
      ]
    };
    
    const response = await apperClient.updateRecord("grade_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update grade:`, failed);
        throw new Error(failed[0].message || "Failed to update grade");
      }
      return response.results[0].data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating grade:", error?.response?.data?.message || error);
    throw error;
  }
};

export const deleteGrade = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("grade_c", params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete grade:`, failed);
        throw new Error(failed[0].message || "Failed to delete grade");
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting grade:", error?.response?.data?.message || error);
    throw error;
  }
};