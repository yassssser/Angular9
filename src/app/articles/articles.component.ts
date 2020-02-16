import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  display: boolean = false
  editable: boolean = false

  articles: Article[] = []

  myArticle: Article = {
    title: "",
    body: ""
  }

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles()
  }

  getAllArticles(){
    this.articleService.getAll().subscribe((res: Article[])=>{
        this.articles = res
    })
  }

  persistArticle(){
    this.articleService.save(this.myArticle).subscribe((res: Article) => {
      this.articles = [res, ...this.articles]

      this.myArticle = {
        title: "",
        body: ""
      }

      this.display = false

    })
  }

  deleteArticle(id){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    Swal.fire({
      title: 'Are you sure to delete this article ?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.articleService.delete(id).subscribe(() => {
          this.articles = this.articles.filter(article => article.id !== id)
        })

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 2000
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

  editArticle(article: Article){
    this.myArticle = article
    this.display = true
    this.editable = true
  }

  updateArticle(){
    this.articleService.update(this.myArticle).subscribe(res => {
      this.myArticle = {
        title: "",
        body: ""
      }
      this.display = false
      this.editable = false
    })
  }

  showForm(){
    this.display = !this.display
  }
}
