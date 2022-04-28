import { CONTAINER, addClinicSproc, incrementClinicCountSproc, 
    updateSiteNoteSproc, createNewPreceptorSproc } from './azureSprocs'

export const addNewClinic = async (clinic_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(addClinicSproc.id).execute(clinic_data.id, clinic_data);
    return
}

export const incrementClinicCount = async (site_id) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(incrementClinicCountSproc.id).execute(site_id, site_id);
    return
}

export const createNewPreceptor = async(clinic_id, preceptor) => {
    const container = CONTAINER;
    await container.scripts.storedProcedure(createNewPreceptorSproc.id).execute(preceptor.id, [clinic_id, preceptor]);
}

export const editSiteNote = async (site_data, note_data) => { 
    const container = CONTAINER;
    await container.scripts.storedProcedure(updateSiteNoteSproc.id).execute(site_data.id, [site_data, note_data]);
    return
}