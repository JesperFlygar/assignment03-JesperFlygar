import { APIRequestContext } from "playwright-core";

export class APIHelper {
    private baseURL: string;
    private token: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    getHeader(){
        return {
            'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
            'Content-Type': 'application/json'
        }
    }

    async getAllPosts(request: APIRequestContext, target: string) {
        const response = await request.get(`${this.baseURL}/api/${target}`, {
            headers: this.getHeader()
        });
        return response;
    }

    async createPost(request: APIRequestContext, target: string, payload: object) {
        const response = await request.post(`${this.baseURL}/api/${target}/new`, {
            data: JSON.stringify(payload),
            headers: this.getHeader()
        })
        return response;
    }
}