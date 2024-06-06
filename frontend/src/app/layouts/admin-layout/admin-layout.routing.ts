import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "service",
    loadChildren: () =>
      import("../../pages/service/service.module").then((m) => m.ServiceModule),
  },
  {
    path: "service_execution",
    loadChildren: () =>
      import("../../pages/service_execution/service_execution.module").then((m) => m.Service_executionModule),
  },
  {
    path: "sepulture",
    loadChildren: () =>
      import("../../pages/sepulture/sepulture.module").then((m) => m.SepultureModule),
  },
  {
    path: "relocation",
    loadChildren: () =>
      import("../../pages/relocation/relocation.module").then((m) => m.RelocationModule),
  },
  {
    path: "plan",
    loadChildren: () =>
      import("../../pages/plan/plan.module").then((m) => m.PlanModule),
  },
  {
    path: "headquarter",
    loadChildren: () =>
      import("../../pages/headquarter/headquarter.module").then((m) => m.HeadquarterModule),
  },
  {
    path: "cremation",
    loadChildren: () =>
      import("../../pages/cremation/cremation.module").then((m) => m.CremationModule),
  },
  {
    path: "administrator",
    loadChildren: () =>
      import("../../pages/administrator/administrator.module").then((m) => m.AdministratorModule),
  },
  {
    path: "comment",
    loadChildren: () =>
      import("../../pages/comment/comment.module").then((m) => m.CommentModule),
  },
  {
    path: "chat",
    loadChildren: () =>
      import("../../pages/chat/chat.module").then((m) => m.ChatModule),
  },
  {
    path: "message",
    loadChildren: () =>
      import("../../pages/message/message.module").then((m) => m.MessageModule),
  },
  {
    path: "room",
    loadChildren: () =>
      import("../../pages/room/room.module").then((m) => m.RoomModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("../../pages/payment/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "subscription",
    loadChildren: () =>
      import("../../pages/subscription/subscription.module").then((m) => m.SubscriptionModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../pages/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "role",
    loadChildren: () =>
      import("../../pages/role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "permission",
    loadChildren: () =>
      import("../../pages/permission/permission.module").then((m) => m.PermissionModule),
  },
  {
    path: "customer",
    loadChildren: () =>
      import("../../pages/customer/customer.module").then((m) => m.CustomerModule),
  },
  {
    path: "beneficiary",
    loadChildren: () =>
      import("../../pages/beneficiary/beneficiary.module").then((m) => m.BeneficiaryModule),
  },
  {
    path: "owner",
    loadChildren: () =>
      import("../../pages/owner/owner.module").then((m) => m.OwnerModule),
  },
  {
    path: "driver",
    loadChildren: () =>
      import("../../pages/driver/driver.module").then((m) => m.DriverModule),
  },
];