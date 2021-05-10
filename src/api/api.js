import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class MovieApi{
    static token;

    static async request(endpoint , data = {} , method = "get"){
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${MovieApi.token}` };
        const params = (method === "get")
        ?data:{};
        try{
            return(await axios({url , method , data , params , headers})).data;
        }catch(err){
            console.error('api error' , err.response)
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getUser(username){
        let res = await this.request(`user/${username}`)
        return res.user;
    }

    static async signUp(data){
        console.log(data)
        let res = await this.request('auth/register' , data , 'post')
        return res.token;
    }

    static async logIn(data){
        let res = await this.request('auth/login' , data , 'post')
        return res.token;
    }

    static async getMovies(){
        let res = await this.request('movie/popular')
        return res;
    }


    static async getToprate(){
        let res = await this.request('movie/toprate')
        return res;

    }

    static async getUpcoming(){
        let res = await this.request('movie/upcoming')
        return res;
    }


    static async getSimilar(id){
        let res = await this.request(`movie/similar/${id}`)
        return res;
    }



    static async movieDetail(id){
        let res = await this.request(`movie/details/${id}`)
        return res;
    }


    static async poster(id){
        let res = await this.request(`movie/poster/${id}`)
        return res;
    }
    static async movieCast(id){
        let res = await this.request(`movie/cast/${id}`)
        return res;
    }

    static async getComment(movieId){
        let res = await this.request(`movie/comment/${movieId}`)
        return res;
    }


    static async leaveComment(username , movieId , comment){
        try{
            let res = await this.request(`movie/comment/${username}/${movieId}` , comment , 'post')
            return res;
        }catch(e){
            console.log(e)
        }
    }


    static async getWatchList(username){
        try{
            let res = await this.request(`watchlist/${username}`)
            return res;
        }catch(e){
            console.log(e)
        }
    }


    static async saveWatchList(username , movieId){
        try{
            let res = await this.request(`watchlist/${username}/${movieId}` , {} , 'post')
            return res;
        }catch(e){
            console.log(e)
        }
    }

    static async deleteWatchListMovie(username , movieId){
        try{
            let res = await this.request(`watchlist/delete/${username}/${movieId}` , {} , 'post')
            return res
        }catch(e){
            console.log(e)
        }
    }
    static async searchMovies(movie){
        try{
            let res = await this.request(`movie/search/${movie}`)
            return res
        }catch(e){
            console.log(e)
        }
    }

    static async getVedio(movieId){
        try{
            let res = await this.request(`movie/vedio/${movieId}`)
            return res
        }catch(e){
            console.log(e)
        }
    }
    
}



export default MovieApi;