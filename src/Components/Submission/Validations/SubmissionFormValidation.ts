

export const validateSubmissionForm = async (triggerValidation: any) => {
    let isFormTypeValid = true,
      result = true;
  
    result = await triggerValidation("submissionID");
    if (!result) isFormTypeValid = result;

    result = await triggerValidation("submissionStatusID");
    if (!result) isFormTypeValid = result;

    result = await triggerValidation("accountName");
    if (!result) isFormTypeValid = result;

    result = await triggerValidation("underwriterID");
    if (!result) isFormTypeValid = result;

    return isFormTypeValid;
  };
  