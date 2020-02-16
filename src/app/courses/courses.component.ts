import { Component } from '@angular/core';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  title: string = "Angular Course"

  myCourse = {
      id : 0,
      label : ""
  }

  listCourses = [
    {
      id : 0,
      label : "Learn Angular"
    },
    {
      id : 1,
      label : "Learn Reactjs"
    },
    {
      id : 2,
      label : "Learn Vuejs"
    }
  ]

  constructor() { }

  addCourse(){
    this.listCourses = [this.myCourse, ...this.listCourses]
   // this.listCourses.unshift(this.myCourse) // add item in the bigenning of the array = this.listCourses = [this.myCourse, ...this.listCourse]
   // this.listCourses.push(this.myCourse) // add item in the end of the array = this.listCourses = [...this.listCourses, this.myCourse]
   this.myCourse = {
      id : 0,
      label :""
   }
  }

  deleteCourse(id){
    // on utilise cette methode si on a une Set ou des element unique dans un tableau car il est risqué
    // let index = this.listCourses.indexOf(course)
    // this.listCourses.splice(id, 1)
      
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    Swal.fire({
      title: 'Are you sure to delete this course ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.listCourses = this.listCourses.filter(course => course.id !== id)

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 3000
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
}
