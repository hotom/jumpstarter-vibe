import { supabase } from './supabase';

/**
 * Check if a user has already submitted the form with the same email
 * @param {string} email - The email to check
 * @returns {Object} The response from Supabase
 */
export const checkDuplicateSubmission = async (email) => {
  try {
    console.log('[ContactService] Checking for duplicate submission with email:', email);
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (error) {
      console.error('[ContactService] Supabase error during duplicate check:', error);
      throw error;
    }

    console.log('[ContactService] Duplicate check result:', { 
      email, 
      exists: data.length > 0, 
      count: data.length 
    });
    
    return { success: true, exists: data.length > 0 };
  } catch (error) {
    console.error('[ContactService] Error checking duplicate submission:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit contact form data to Supabase database
 * @param {Object} formData - The contact form data
 * @param {string} formData.name - The submitter's name
 * @param {string} formData.email - The submitter's email
 * @param {string} formData.message - The submitter's message
 * @returns {Object} The response from Supabase
 */
export const submitContactForm = async (formData) => {
  try {
    console.log('[ContactService] Starting form submission:', formData);
    
    // First check if this email has already submitted
    console.log('[ContactService] Checking for duplicate submission...');
    const duplicateCheck = await checkDuplicateSubmission(formData.email);
    
    if (duplicateCheck.success && duplicateCheck.exists) {
      console.log('[ContactService] Duplicate submission detected for email:', formData.email);
      return { 
        success: false, 
        error: 'duplicate', 
        message: 'You have already submitted this form before with this email address.' 
      };
    }
    
    console.log('[ContactService] No duplicate found, proceeding with submission...');

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          submitted_at: new Date()
        }
      ])
      .select();

    if (error) {
      console.error('[ContactService] Supabase error during submission:', error);
      throw error;
    }

    console.log('[ContactService] Form submitted successfully:', { data });
    return { success: true, data };
  } catch (error) {
    console.error('[ContactService] Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};