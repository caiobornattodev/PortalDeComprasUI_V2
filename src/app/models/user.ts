export interface User {
    id: number
    name: string
    sapUser: string
    sapPassword: string
    companyId: number
    company: string
    active: boolean
    userType: number
    employeeId: number
    employeeName: string
    createdAt: Date
    updatedAt: Date
    token: string
}