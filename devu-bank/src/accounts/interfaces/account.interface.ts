
export interface  Ibeneficiary {
  firstname: string
  lastname: string
}

export interface Ibalance {
  cents: number
  display: string
}

export interface Iaccount {
  id: string
  beneficiary: Ibeneficiary;
  balance: Ibalance
  createdAt: Date
}
 
