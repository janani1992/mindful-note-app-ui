export const validateNote = (noteInfo) => {
    const errors = {};
    if(!noteInfo.title?.trim()){
        errors.title = 'Title is required';
    }
    if (!noteInfo.content?.trim()) {
        errors.content = 'Content is required';
    } 

    if (!noteInfo.priority) {
        errors.priority = 'Priority is required';
    }
    
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};