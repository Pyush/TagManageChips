import {AfterViewInit, Directive, ElementRef, EventEmitter, OnChanges, OnDestroy, Output} from "@angular/core";
import * as $ from "jquery";
import {SharedService} from "../shared-service.service";
import "../../../node_modules/typeahead.js/dist/bloodhound.min.js";
import "../../../node_modules/typeahead.js/dist/typeahead.bundle.min.js";
import "../../../node_modules/typeahead.js/dist/typeahead.jquery.min.js";

@Directive({
  selector: '[TagsManager]'
})
export class TagsManagerDirective implements AfterViewInit, OnDestroy, OnChanges {

  @Output() seleteedTagList: EventEmitter<any> = new EventEmitter();

  autocompletetextarea: any;
  tagmanagerObj: any;

  constructor(private elementRef: ElementRef,
              private sharedService: SharedService) {
  }

  addTag(tag) {
    this.tagmanagerObj.tagsManager('pushTag', tag);
    this.seleteedTagList.emit(this.getTags());
  }

  ngOnChanges(): void {
    console.log(jQuery(this.autocompletetextarea).tagsManager('tags'));
  }

  @Output() getTags(): any {
    return jQuery(this.autocompletetextarea).tagsManager('tags');
  }

  ngAfterViewInit(): void {

    this.sharedService.getSearchObserver().subscribe(item => {
      console.log(item);
      console.log('notified by shared service');
      if (item !== null) {
        this.addTag(item);
      }
    });

    console.log($.fn.jquery);
    this.autocompletetextarea = $(this.elementRef.nativeElement);

    // wokring example
    this.tagmanagerObj = jQuery(this.autocompletetextarea).tagsManager({
      prefilled: [],
      CapitalizeFirstLetter: true,
      preventSubmitOnEnter: true,
      typeahead: true,
      AjaxPush: null,
      AjaxPushAllTags: null,
      AjaxPushParameters: null,
      delimiters: [9, 13, 44, 188],
      backspace: [8],
      blinkBGColor_1: '#FFFF9C',
      blinkBGColor_2: '#CDE69C',
      hiddenTagListName: 'hiddenTagListA',
      hiddenTagListId: null,
      deleteTagsOnBackspace: true,
      tagsContainer: null,
      tagCloseIcon: '×',
      tagClass: '',
      validator: null,
      onlyTagList: false
    });

    this.tagmanagerObj.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'states',
        source: substringMatcher(this.states)
      }).on('typeahead:selected', function (e, d) {
      console.log(d);
      jQuery(this.autocompletetextarea).tagsManager("pushTag", d);
      // this.tagmanagerObj.tagsManager("pushTag", d);
    });

  }

  ngOnDestroy(): void {
  }

  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


  /*public statesComplex: Array<any> = [
   {id: 1, name: 'Alabama'}, {id: 2, name: 'Alaska'}, {id: 3, name: 'Arizona'},
   {id: 4, name: 'Arkansas'}, {id: 5, name: 'California'},
   {id: 6, name: 'Colorado'}, {id: 7, name: 'Connecticut'},
   {id: 8, name: 'Delaware'}, {id: 9, name: 'Florida'},
   {id: 10, name: 'Georgia'}, {id: 11, name: 'Hawaii'},
   {id: 12, name: 'Idaho'}, {id: 13, name: 'Illinois'},
   {id: 14, name: 'Indiana'}, {id: 15, name: 'Iowa'},
   {id: 16, name: 'Kansas'}, {id: 17, name: 'Kentucky'},
   {id: 18, name: 'Louisiana'}, {id: 19, name: 'Maine'},
   {id: 21, name: 'Maryland'}, {id: 22, name: 'Massachusetts'},
   {id: 23, name: 'Michigan'}, {id: 24, name: 'Minnesota'},
   {id: 25, name: 'Mississippi'}, {id: 26, name: 'Missouri'},
   {id: 27, name: 'Montana'}, {id: 28, name: 'Nebraska'},
   {id: 29, name: 'Nevada'}, {id: 30, name: 'New Hampshire'},
   {id: 31, name: 'New Jersey'}, {id: 32, name: 'New Mexico'},
   {id: 33, name: 'New York'}, {id: 34, name: 'North Dakota'},
   {id: 35, name: 'North Carolina'}, {id: 36, name: 'Ohio'},
   {id: 37, name: 'Oklahoma'}, {id: 38, name: 'Oregon'},
   {id: 39, name: 'Pennsylvania'}, {id: 40, name: 'Rhode Island'},
   {id: 41, name: 'South Carolina'}, {id: 42, name: 'South Dakota'},
   {id: 43, name: 'Tennessee'}, {id: 44, name: 'Texas'},
   {id: 45, name: 'Utah'}, {id: 46, name: 'Vermont'},
   {id: 47, name: 'Virginia'}, {id: 48, name: 'Washington'},
   {id: 49, name: 'West Virginia'}, {id: 50, name: 'Wisconsin'},
   {id: 51, name: 'Wyoming'}];*/

}


let URL = 'community/user/search';
let searchFromWeb = function () {
  return function (q, callback) {
    console.log(q);

    var form = new FormData();
    if (q) {
      form.append('status.id', '' + 2);
      form.append('user.fullName', q);
    } else {
      form.append('status.id', '' + 2);
    }

    form.append("start", "0");
    form.append("end", "5");

    $.ajax({
      async: true,
      crossDomain: true,
      url: URL,
      method: "POST",
      headers: {
        /*'communityid': communityIdR,
         'sessionid': sessionR,*/
      },
      data: form,
      processData: false,
      contentType: false
    }).done(function (response) {
      console.log(response);
      callback(response.list);
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR);
      callback([]);
    });
  };
};


let substringMatcher = function (strs) {
  return function findMatches(q, cb) {
    let matches, substringRegex;
    console.log(q);
    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    let substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
