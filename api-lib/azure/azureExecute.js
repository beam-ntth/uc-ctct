import { CONTAINER, addClinicSproc } from './azureSprocs'
import { CONTAINER, updateSiteNote } from './azureSprocs'


export const addNewClinic = async (clinic_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}
export const editSiteNote = async (site_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(updateSiteNote.id).execute(site_data.id, site_data);
    return
}

