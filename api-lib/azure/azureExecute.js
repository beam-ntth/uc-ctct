import { CONTAINER, addClinicSproc, updateSiteNote } from './azureSprocs'

export const addNewClinic = async (clinic_data) => { 
    const container = CONTAINER;
    console.log(clinic_data)
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}

export const editSiteNote = async (site_data, note_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(updateSiteNote.id).execute(site_data.id, site_data, note_data);
    return
}