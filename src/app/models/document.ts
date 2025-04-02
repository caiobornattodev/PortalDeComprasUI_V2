import { Attachement } from "./attachement"
import { AttachmentDetail } from "./attachtementDetail"
import { DocumentAdditionalExpense } from "./documentAditionalExpense"
import { DocumentLine } from "./documentLine"
import { UserCredential } from "./userCredential"

export interface SapDocument {
    isDraft: string
    docStatus: string
    docEntry: number
    docNum: string
    objType: number
    docType: string
    docDate: Date | undefined
    docDueDate: Date | undefined
    taxDate: Date
    reqDate: Date
    cardCode: string | null
    cardName: string | null
    comments: string
    header: string | null
    footer: string | null
    docTotal: number
    requester: string
    reqName: string
    branch: string
    department: string
    email: string | null;
    title: string
    documentLines: DocumentLine[]
    additionalExpenses: DocumentAdditionalExpense[]
    attachement: Attachement
    attachmentDetail: AttachmentDetail[]
    userCredentialDTO: UserCredential
}