import { Component } from '@angular/core';
import { Staff } from '../models/staff';
import { StaffService } from '../services/staff.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogModel } from '../models/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'title', 'email', 'role', 'action']
  staffs: Staff[] = []

  constructor(private staffService: StaffService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.getStaff()
  }

  getStaff() {
    this.staffService.getAllStaff().subscribe(res => {
      this.staffs = res
    })
  }

  addStaff() {
    let data: DialogModel = {
      mode: "Add",
      title: 'Add Employee'
    }

    this.openDialog(data)
  }

  editStaff(id: number) {
    let employee: Staff = this.staffs.find(x => x.id == id)!

    let data: DialogModel = {
      mode: "Edit",
      title: 'Edit Employee',
      data: employee
    }

    this.openDialog(data)
  }

  deleteStaff(id: number) {
    let employee: Staff = this.staffs.find(x => x.id == id)!

    let data: DialogModel = {
      mode: "Delete",
      title: 'Delete Employee',
      data: employee
    }

    this.openDialog(data)
  }

  openDialog(data: DialogModel) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = true
    dialogConfig.id = "addDialog"
    dialogConfig.data = data
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      if (res.result) {
        if (res.mode == 'Add') {
          this.staffService.createStaff(res.data).subscribe(data => {
            this.openSnackBar(data.message)
            this.getStaff()
          })
        }
        else if (res.mode == 'Edit') {
          this.staffService.editStaff(res.data, data.data!.id).subscribe(data => {
            this.openSnackBar(data.message)
            this.getStaff()
          })
        }
        else if (res.mode == 'Delete') {
          this.staffService.deleteStaff(res.data).subscribe(data => {
            this.openSnackBar(data.message)
            this.getStaff()
          })
        }
      }
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
        duration: 5000
    })
  }
}
