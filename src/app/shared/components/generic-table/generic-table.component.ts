import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Output() selected = new EventEmitter<number>();
  @Output() dateil = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() pdf = new EventEmitter<number>();
  @Input("columns") columns: any = [];
  @Input("table") table: string = "";
  @Input("filter") filter: any = "";
  @Input("options") options: any = [];
  @Input("dataTable") dataTable: any;
  public data: any[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  constructor(private genericService: GenericService, public dialog: MatDialog, private snackBar: MatSnackBar, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    if (this.dataTable == undefined)
      this.Get();
    if (this.dataTable.length >= 0) {
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
    }
    // this.loadingService.ChangeStatusLoading()
  }
  ChangePage(event: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.Get();
  }
  Get() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll(
      this.table + '?PageNumber=' + (this.pageNumber + 1) + '&PageSize=' + this.pageSize, this.filter).subscribe(data => {
        this.data = data.data;
        this.pageSize = data.pageSize;
        this.totalItems = data.totalItems;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
      }, error => {
        console.error(error);
        this.openSnackBar(error.error.Message);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
      });
  }
  DeletePeople(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "no podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService.Delete(this.table, id).subscribe(data => {
          this.openSnackBar(data.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
          if (this.dataTable == undefined)
            this.Get();
          else
            window.location.reload();
        }, error => {
          console.error(error);
          this.openSnackBar(error.error.Message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1000);
        });
      }
    })
  }
  DetailOrEditItem(id: number, type: number) {
    this.loadingService.ChangeStatusLoading(true);
    if (type == 1)
      this.dateil.emit(id);
    if (type == 2)
      this.edit.emit(id);
    if (type == 3)
      this.pdf.emit(id);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
  }
  SeletedItem(id: number, estado: any, validationSelect: boolean | any) {
    this.loadingService.ChangeStatusLoading(true);
    if (estado == 0 || validationSelect == false)
      this.selected.emit(id);
    else
      this.openSnackBar("El registro con la id: " + id + " esta deshabilitado.");
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  ChangeStaTus(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService.ChangeStatus(this.table, id).subscribe(data => {
          this.loadingService.ChangeStatusLoading(false);
          if (this.dataTable == undefined)
            this.Get();
          else
            window.location.reload();
          this.openSnackBar(data.message);
        }, error => {
          console.error(error);
          this.openSnackBar(error.error.Message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1000);
        });
      }
    })
  }
}