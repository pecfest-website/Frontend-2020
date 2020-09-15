import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from '@angular/forms';
@Injectable({providedIn: 'root'})
export class AdminService{
  private url="http://localhost:8080/event/admin"
  constructor(private http: HttpClient,private cookieService:CookieService) {
  }
  getEventDetails():Observable<any> {
    return this.http.get(this.url,{headers:this.getHttpHeader()});
  }

  private getHttpHeader() {
    let  headers:HttpHeaders=new HttpHeaders();
    return headers.set("session_id",this.cookieService.get("session_id"));
  }


  deleteEvent(event_id: any) :Observable<any>{
    return this.http.delete(this.url+`/${event_id}`,{headers:this.getHttpHeader()});
  }

  addEvent(form: FormGroup) {
    return this.http.post(this.url,this.getEventRequestBody(form),{headers:this.getHttpHeader()})
  }

  private getEventRequestBody(form: FormGroup) {
    return {event_name:form.controls["event_name"].value,event_banner_image_url:form.controls["event_banner_image_url"].value,
    event_type:form.controls["event_type"].value,event_count:form.controls["event_count"].value,organizing_club:form.controls["organizing_club"].value,
      organizer_contact_no:form.controls["organizer_contact_no"].value,min_number_of_participants:form.controls["min_number_of_participants"].value,
      max_number_of_participants:form.controls["max_number_of_participants"].value,prize_money_worth:form.controls["prize_money_worth"].value,
    venue:form.controls["venue"].value,rules:form.controls["rules"].value,event_description:form.controls["event_description"].value,
      event_start_date_and_time:form.controls["event_start_date_and_time"].value,event_end_date_and_time:form.controls["event_end_date_and_time"].value};
  }

  editEvent(form: FormGroup) {
    return this.http.put(this.url+`/${form.controls["$key"].value}`,this.getEventRequestBody(form),{headers:this.getHttpHeader()})
  }
}

