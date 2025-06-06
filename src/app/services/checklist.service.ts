import { Injectable } from '@angular/core';
import { ChecklistItem } from '../progression/checklist/checklist-item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  /* If using a Json Server:*/
  // url = 'http://localhost:3000/todo';

  // async getChecklistByStage(stage: string): Promise<ChecklistItem[]> {
  //   const response = await fetch(`${this.url}?stage=${encodeURIComponent(stage)}`);
  //   return await response.json() ?? [];
  // }

  // async getChecklist(): Promise<ChecklistItem[]> {
  //   const data = await fetch(this.url);
  //   return await data.json() ?? [];
  // }
  

  private data: { todo: ChecklistItem[] } = {
    "todo":
      [
        {
          "id": 1,
          "stage": "Settling In",
          "task": "Schedule an appointment for NIE",
          "link": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus",
          "description": " "
        },
        {
          "id": 2,
          "stage": "Settling In",
          "task": "Prepare the necessary documents for NIE",
          "link": "https://www.inclusion.gob.es/web/migraciones/w/certificado-de-registro-de-ciudadano-de-la-union-europea-hi-101-",
          "description": " "
        },
        {
          "id": 3,
          "stage": "Settled",
          "task": "Schedule an appointment for empadronamiento",
          "link": " https://www.laspalmasgc.es/es/otras-secciones/cita-previa/",
          "description": " "
        },
        {
          "id": 4,
          "stage": "Settled",
          "task": "Prepare the necessary documents for empadronamiento",
          "link": "https://sedeelectronica.laspalmasgc.es/web/fichaAsunto.do?opcion=0&asas_ide_asu=857&ruta=/web/asuntosMasUsuales.do?opcion",
          "description": " "
        },
        {
          "id": 5,
          "stage": "Preparation",
          "task": "Check passport/ID validity and apply if necessary",
          "description": " "
        },
        {
          "id": 6,
          "stage": "Preparation",
          "task": "Check EHIC card validity and apply if necessary",
          "link": "https://employment-social-affairs.ec.europa.eu/policies-and-activities/moving-working-europe/eu-social-security-coordination/european-health-insurance-card_en",
          "description": " "
        },
        {
          "id": 7,
          "stage": "Preparation",
          "task": "Check EHIC card validity and apply if necessary",
          "link": "https://employment-social-affairs.ec.europa.eu/policies-and-activities/moving-working-europe/eu-social-security-coordination/european-health-insurance-card_en",
          "description": " "
        },
        {
          "id": 8,
          "stage": "Preparation",
          "task": "Check your debit card limits in the destination country's currency and apply for a better one if necessary",
          "description": " "
        },
        {
          "id": 9,
          "stage": "Preparation",
          "task": "If you have insurance, check its coverage and apply for additional coverage if necessary",
          "description": " "
        },
        {
          "id": 10,
          "stage": "Preparation",
          "task": "Check your roaming package included in your current telecom plan",
          "description": " "
        },
        {
          "id": 11,
          "stage": "Preparation",
          "task": "Check your roaming package included in your current telecom plan",
          "description": " "
        },
        {
          "id": 12,
          "stage": "Preparation",
          "task": "Finalize the learning agreement",
          "description": " "
        },
        {
          "id": 13,
          "stage": "Settling In",
          "task": "Submit the certificate of arrival template to the university if a specific one is required",
          "description": " "
        },
        {
          "id": 14,
          "stage": "Settling In",
          "task": "Collect the certificate of arrival from the coordinator and submit it to your home university",
          "description": " "
        },
        {
          "id": 15,
          "stage": "Preparation",
          "task": "Find interesting accommodation offers",
          "link": "https://internacional.ulpgc.es/en/movilidad-incoming/estudiantes-incoming/study-at-the-ulpgc-incoming/exchange-students/accommodation/",
          "description": " "
        },
        {
          "id": 16,
          "stage": "Trip Day",
          "task": "Check the best transport connections to your place of residence",
          "link": "https://www.grancanaria.com/turismo/en/create-your-own-holiday/around-the-island/have-you-just-arrived-at-gran-canaria/",
          "description": " "
        },
        {
          "id": 17,
          "stage": "Trip Day",
          "task": "Contact the landlord or the reception of your accommodation",
          "description": " "
        },
        {
          "id": 18,
          "stage": "Settled",
          "task": "Follow local organizator of erasmus acitivities: ESN",
          "link": "linktr.ee/ESNLasPalmas",
          "description": " "
        },
        {
          "id": 19,
          "stage": "Settled",
          "task": "Follow local organizator of erasmus acitivities: Erasmus Life",
          "link": "linktr.ee/erasmuslifelaspalmas",
          "description": " "
        },
        {
          "id": 20,
          "stage": "Settled",
          "task": "Apply for free public transport: Wawa Joven or Bono Residente",
          "link": "https://www.guaguas.com/tarifas-carnets",
          "description": " "
        },
        {
          "id": 21,
          "stage": "Settled",
          "task": "Apply for a residential discount for travel",
          "link": "https://www.laspalmasgc.es/es/ayuntamiento/certificados/",
          "description": " "
        },
        {
          "id": 22,
          "stage": "Departure",
          "task": "Submit the certificate of attendance template to the university if a specific one is required",
          "description": " "
        },
        {
          "id": 23,
          "stage": "Departure",
          "task": "Collect the certificate of attendance from the coordinator and submit it to your home university",
          "description": " "
        },
        {
          "id": 24,
          "stage": "Preparation",
          "task": "Verify the necessity of applying for a visa in your case",
          "link": "https://www.exteriores.gob.es/Embajadas/seul/en/ServiciosConsulares/Paginas/Consular/Visados-nacionales-Informacion-general.aspx",
          "description": " "
        },
        {
          "id": 25,
          "stage": "Preparation",
          "task": "Sign the grant agreement at your home university",
          "description": " "
        },
        {
          "id": 26,
          "stage": "Preparation",
          "task": "Polish your skills in the language of your erasmus studies",
          "link": "https://erasmus-plus.ec.europa.eu/resources-and-tools/online-language-support",
          "description": " "
        },
        {
          "id": 27,
          "stage": "Settling In",
          "task": "Make changes to the Learning Agreement if necessary",
          "description": " "
        },
        {
          "id": 28,
          "stage": "Departure",
          "task": "Collect the Transcript of Records from the host university",
          "description": " "
        },
        {
          "id": 29,
          "stage": "Departure",
          "task": "Submit the Transcript of Records to your home university",
          "description": " "
        },
        {
          "id": 30,
          "stage": "Departure",
          "task": "Arrange the return of your security deposit from your accommodation",
          "description": " "
        },
        {
          "id": 31,
          "stage": "Departure",
          "task": "Clean your place of residence before departure",
          "description": " "
        },
        {
          "id": 32,
          "stage": "Departure",
          "task": "Arrange the time and method of handing over the keys with the landlord",
          "description": " "
        }
      ]
  }
  
  getChecklist(): ChecklistItem[] {
    return this.data.todo;
  }

  getChecklistByStage(stage: string): ChecklistItem[] {
    return this.data.todo.filter(item => item.stage === stage);
  }

  getChecklistItemById(id: number): ChecklistItem {
    return this.data.todo.filter(item => item.id === id)[0];
  }

  constructor() { }
}
