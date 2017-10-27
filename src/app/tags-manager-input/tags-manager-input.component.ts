import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'tags-manager-input',
  templateUrl: './tags-manager-input.component.html',
  styleUrls: ['./tags-manager-input.component.css']
})
export class TagsManagerInputComponent implements AfterViewInit,OnDestroy {

  query = '';
  url2 = '../assets/data.json';

  handleResult2Selected (result) {
    console.log(result);
    this.query=result;
    jQuery(this.autocompletetextarea).tagsManager('pushTag',result);
    this.query = '';
  }

  autocompletetextarea: any;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    console.log($.fn.jquery);
    this.autocompletetextarea = $(this.elementRef.nativeElement);

    // wokring example
    jQuery(this.autocompletetextarea).tagsManager({
      prefilled: ["Pisa", "Rome"],
      CapitalizeFirstLetter: true,
      AjaxPush: null,
      AjaxPushAllTags: null,
      AjaxPushParameters: null,
      delimiters: [9, 13, 44],
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

  }

  ngOnDestroy(): void {
  }

}
