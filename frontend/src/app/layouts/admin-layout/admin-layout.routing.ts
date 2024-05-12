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
    path: "campus",
    loadChildren: () =>
      import("../../pages/campus/campus.module").then((m) => m.CampusModule),
  },
  {
    path: "hall",
    loadChildren: () =>
      import("../../pages/hall/hall.module").then((m) => m.HallModule),
  },
  {
    path: "pay",
    loadChildren: () =>
      import("../../pages/pay/pay.module").then((m) => m.PayModule),
  },
  {
    path: "subscription",
    loadChildren: () =>
      import("../../pages/subscription/subscription.module").then(
        (m) => m.SubscriptionModule
      ),
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
      import("../../pages/permission/permission.module").then(
        (m) => m.PermissionModule
      ),
  },
  {
    path: "client",
    loadChildren: () =>
      import("../../pages/client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "beneficiary",
    loadChildren: () =>
      import("../../pages/beneficiary/beneficiary.module").then(
        (m) => m.BeneficiaryModule
      ),
  },
  {
    path: "account-holder",
    loadChildren: () =>
      import("../../pages/account-holder/account-holder.module").then(
        (m) => m.AccountHolderModule
      ),
  },
  {
    path: "driver",
    loadChildren: () =>
      import("../../pages/driver/driver.module").then((m) => m.DriverModule),
  },
];
