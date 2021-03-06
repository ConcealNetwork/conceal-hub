import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	api = environment.walletAPI

	constructor(private http: HttpClient) { }

	check2FA() {
		return this.http.get(`${this.api}/two-factor-authentication/enabled`)
  }

	getWalletsData() {
		return this.http.get(`${this.api}/wallet/unified`)
	}

	getDeposits() {
		return this.http.get(`${this.api}/deposits/list`)
	}

	addDeposit(amount:number, wallet:string, term:number, code:string, password:string) {
		const body = {
			amount, wallet, term, code, password
		}
		return this.http.post(`${this.api}/deposits`, JSON.stringify(body))
	}

	unlockDeposit(depositId:number) {
    const body = {
			depositId
		}
		return this.http.put(`${this.api}/deposits`, JSON.stringify(body))
  }

	getWalletKeys(address: string, code: string) {
		return this.http.get(`${this.api}/wallet/keys?address=${address}&code=${code}`)
	}

	getMessages() {
    return this.http.get(`${this.api}/wallet/messages`)
	}

	sendMessage(address: string, message: string, wallet:string, code:string, password: string) {
		const body = {
			address, message, wallet, code, password
		}
		return this.http.post(`${this.api}/wallet/send-message`, JSON.stringify(body))
	}

	getContacts() {
    return this.http.get(`${this.api}/user`)
	}

	getUser() {
    return this.http.get(`${this.api}/user`)
	}

	addContact(label: string, address:string, paymentID:string, entryID=null, edit=false) {
		const body = {
			label, address, paymentID, entryID, edit
		}
		return this.http.post(`${this.api}/address-book`, JSON.stringify(body))
	}

	deleteContact(entryID:string) {
		return this.http.delete(`${this.api}/address-book/delete/entryID/${entryID}`)
	}

	deleteWallet(address:string) {
		return this.http.delete(`${this.api}/wallet?address=${address}`)
	}

	createWallet() {
		return this.http.post(`${this.api}/wallet`, null)
	}

	createDeposit(amount: number, wallet: string, term: number, code?: string, password?: string) {
		const body = {
			amount, wallet, term, code, password
		}
		return this.http.post(`${this.api}/deposits`, JSON.stringify(body))
	}

	listDeposits() {
		return this.http.get(`${this.api}/deposits/list`)
	}

	importWallet(privateSpendKey:string) {
		privateSpendKey = JSON.stringify({ privateSpendKey })
		return this.http.post(`${this.api}/wallet/import`, privateSpendKey)
	}

	createTransaction(amount:number, wallet:string, address:string, paymentID:string, message:string, code:string, password:string) {
		let client = ''
		let ref = ''
		if(!message) message = ''
		if(!paymentID) paymentID = ''
    const body = {
      amount: amount,
			wallet,  		// origin
			address,  	// destination
			paymentID, 	// destination ID
			message, 		// message
			code,				// 2FA code
			password,		// password
			client,			// Client not used
			ref					// Ref not used
		}
		return this.http.put(`${this.api}/wallet`, JSON.stringify(body))
  }

	listIDs() {
		return this.http.get(`${this.api}/id`)
	}

	deleteID(id:string, address: string, name:string) {
		return this.http.delete(`${this.api}/id/delete?id=${id}&address=${address}&name=${name}`)
	}

	createID(address: string, addressToCreate:string, id:string, name:string) {
		const body = {
			address, 						// Payment Address
			addressToCreate, 		// Linked Address
			id, 								// Conceal ID
			name								// Label
		}
		return this.http.post(`${this.api}/id`, JSON.stringify(body))
	}

}