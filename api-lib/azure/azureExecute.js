import { CONTAINER, addClinicSproc, addPreceptorSproc } from './azureSprocs'

export const addNewClinic = async (clinic_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}

export const addPreceptor = async (preceptor_data) => {
  const container = CONTAINER;
  await container.scripts.storedProcedure(addPreceptorSproc.id).execute(preceptor_data.id, preceptor_data);
  return
}