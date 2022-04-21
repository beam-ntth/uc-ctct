import { CONTAINER, addClinicSproc } from '../api-lib/azure/sprocs'

export const addNewClinic = (clinic_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}