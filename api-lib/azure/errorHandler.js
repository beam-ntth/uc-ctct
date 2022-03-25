export const handleDeleteError = (errorCode) => {
  // If we try to delete an already deleted value, simply return and do not throw an error.
  switch (errorCode){
    case (404):
      return;
    default:
      throw Error("Issue with deletion. Contact IT.");
  }
}

export const handleGetError 







/**
 * Handler for the error codes that can occur when utilizing our DB operations.
 */
export const handleError = (opFlag, errorCode) => {
  
}