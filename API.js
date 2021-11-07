import { encode } from "base-64";

export default class Auth {
    constructor() {
        this.auth_code = undefined;
        this.access_token = undefined;
        this.refresh_token = undefined;
    }

    static redirect_uri = "exp://127.0.0.1:19000";
    static client_id = "e3t0ixFSw5lrApAqVPrGMA";
    static scopes = [
        "creddits",
        "modcontributors",
        "modmail",
        "modconfig",
        "subscribe",
        "structuredstyles",
        "vote",
        "wikiedit",
        "mysubreddits",
        "submit",
        "modlog",
        "modposts",
        "modflair",
        "save",
        "modothers",
        "read",
        "privatemessages",
        "report",
        "identity",
        "livemanage",
        "account",
        "modtraffic",
        "wikiread",
        "edit",
        "modwiki",
        "modself",
        "history",
        "flair",
    ];

    static url = {
        authorizationEndpoint:
            "https://www.reddit.com/api/v1/authorize.compact",
        tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
        refreshEndpoint: "https://www.reddit.com/api/v1/refresh_token",
    };

    static buildForm(grant_type, code) {
        let formData = new FormData();
        formData.append("redirect_uri", Auth.redirect_uri);
        if (grant_type === "authorization_code") {
            formData.append("grant_type", "authorization_code");
            formData.append("code", code);
        } else if (grant_type === "refresh_token") {
            formData.append("grant_type", "authorization_code");
            formData.append("code", code);
        } else {
            throw "Unhandled Grant type " + grant_type;
        }

        return formData;
    }

    async getAccessToken(auth_code) {
        if (!auth_code) throw "No Auth Code";

        const formData = Auth.buildForm("authorization_code", auth_code);

        const res = await fetch(Auth.url.tokenEndpoint, {
            method: "POST",
            headers: { Authorization: `Basic ${encode(Auth.client_id + ":")}` },
            body: formData,
        });
        const json = await res.json();
        this.access_token = await json.access_token;
        console.log("token:", json.access_token);
        return json;
    }

    async makeRequest(url) {
        console.log("Fetching on", url);

        const res = await fetch(url, {
            method: "GET",
            headers: url.includes("oauth")
                ? { Authorization: "bearer " + this.access_token }
                : undefined,
            "User-agent": "redditech",
        });
        const data = await res.json();
        if (data.error) throw data.message;

        return data;
    }

    async postRequest(url) {
        console.log("Fetching on", url);

        const res = await fetch(url, {
            method: "POST",
            headers: url.includes("oauth")
                ? { Authorization: "bearer " + this.access_token }
                : undefined,
            "User-agent": "redditech",
        });
        const data = await res.json();
        if (data.error) throw data.message;

        return data;
    }

    async patchRequest(url, body) {
        console.log("Fetching on", url);
        const res = await fetch(url, {
            method: "PATCH",
            headers: url.includes("oauth")
                ? {
                      Authorization: "bearer " + this.access_token,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  }
                : undefined,
            "User-agent": "redditech",
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.error) throw data.message;
        return data;
    }
}
