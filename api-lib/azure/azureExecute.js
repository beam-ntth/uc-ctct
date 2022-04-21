import { CONTAINER, addClinicSproc } from './azureSprocs'

export const addNewClinic = async (clinic_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}