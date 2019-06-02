import { HttpClient } from '@angular/common/http';

/* This class rappresent base informations used in every service in this application.
   All service use this endpoint in the API for reading all the informations, with different path in most cases! */
export class BaseService {

    /* This is a public-api key(open for everyone), 
    you can get your key for free from https://www.themoviedb.org/ 
    -> just register with a valid email and vualá */
    ApiKey: string = '29371e05e1dfa0327af74c0805fef777';

    constructor(public http: HttpClient) { }

    public DetailsREST(id, path, languege, type) {
        return this.http.get<any>('https://api.themoviedb.org/3/'+type+'/'+id+path+'?api_key='+this.ApiKey+languege);
    }

    public PersonREST(id, path, languege) {
        return this.http.get<any>('https://api.themoviedb.org/3/person/'+id+path+'?api_key='+this.ApiKey+languege);
    }

    public SearchREST(str, languege, params, type) {
        return this.http.get<any>('https://api.themoviedb.org/3/search/'+type +'?api_key='+this.ApiKey+languege+str+params);
    }

    public ListREST(listID, languege) {
        return this.http.get<any>('https://api.themoviedb.org/3/list/'+listID+'?api_key='+this.ApiKey+languege);
    }

    public SeasonREST(seasonNumber, showId) {
        return this.http.get<any>('https://api.themoviedb.org/3/tv/'+ showId +'/season/'+ seasonNumber +'?api_key='+this.ApiKey+'&language=en-US');
    }

}