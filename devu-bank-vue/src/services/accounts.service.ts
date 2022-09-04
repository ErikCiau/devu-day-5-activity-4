import { Iaccount, Ibalance, Ibeneficiary } from '../interfaces/api.interfaces'

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

export function useAccount() {
  const baseUrl = `http://localhost:3000`
  const baseOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const getAccounts = async () => {
    try {
      // GET http://localhost:3000/cuentas
      const response = await fetch(`${baseUrl}/cuentas`, {
        method: HttpMethod.GET,
        headers: {
          ...baseOptions.headers
        }
      })
      return await response.json() as Promise<Iaccount[]>
    } catch (error) {
      throw error
    }
  }

  const getAccountById = async (id: string) => {
    try {
      // GET http://localhost:3000/cuentas/:id
      const response = await fetch(`${baseUrl}/cuentas/${id}`, {
        method: HttpMethod.GET,
        headers: {
          ...baseOptions.headers
        }
      })
      return response.json() as Promise<Iaccount>
    } catch (error) {
      throw error
    }
  }

  const addAccount = async (body: Partial<Ibalance>) => {
    try {
      // POST http://localhost:3000/cuentas
      const response = await fetch(`${baseUrl}/cuentas`, {
        method: HttpMethod.POST,
        headers: {
          ...baseOptions.headers
        },
        body: JSON.stringify(body)
      })
      return response.json() as Promise<Iaccount>
    } catch (error) {
      throw error
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      // DELETE http://localhost:3000/cuentas/:id
      const response = await fetch(`${baseUrl}/cuentas/${id}`, {
        method: HttpMethod.DELETE,
        headers: {
          ...baseOptions.headers
        }
      })
      return response.json() as Promise<Iaccount>
    } catch (error) {
      throw error
    }
  }

  const updateAccount = async (id: string, account: any) => {
    try {
      // PUT http://localhost:3000/cuentas/:id
      const response = await fetch(`${baseUrl}/cuentas/${id}`, {
        method: HttpMethod.PUT,
        headers: {
          ...baseOptions.headers
        },
        body: JSON.stringify(account)
      })
      return response.json() as Promise<Iaccount>
    } catch (error) {
      throw error
    }
  }

  const updatePartialAccount = async (id: string, partial: any) => {
    try {
      // PATCH http://localhost:3000/cuentas/:id
      const response = await fetch(`${baseUrl}/cuentas/${id}`, {
        method: HttpMethod.PATCH,
        headers: {
          ...baseOptions.headers
        },
        body: JSON.stringify(partial)
      })
      return response.json() as Promise<Iaccount>
    } catch (error) {
      throw error
    }
  }

  return {
    getAccounts,
    getAccountById,
    addAccount,
    deleteAccount,
    updateAccount,
    updatePartialAccount
  }
}