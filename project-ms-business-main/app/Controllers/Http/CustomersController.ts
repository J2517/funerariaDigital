import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";
import CustomerValidator from "App/Validators/CustomerValidator";

export default class CustomersController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    let customers;

    if (params.id) {
      customers = [await Customer.findOrFail(params.id)];
    } else if (page && per_page) {
      customers = await Customer.query().paginate(page, per_page);
    } else {
      customers = await Customer.all();
    }

    if (page && per_page) {
      return {
        meta: customers.getMeta(),
        data: customers.toJSON(),
      };
    }

    return customers;
  }

  public async getChatByServiceExecution({ params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id);
    const serviceExecution = await customer.related("serviceExecutions")
      .query()
      .where("id", params.service_execution_id)
      .first();

    return serviceExecution?.related("chat");
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CustomerValidator);
    const theCustomer: Customer = await Customer.create(body);
    return theCustomer;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const data = request.body();
    theCustomer.merge(data);
    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    response.status(204);
    return await theCustomer.delete();
  }

  // get all subscriptions by customer
  public async getSubscriptionByCustomer({ params }: HttpContextContract) {
    const theCustomer = await Customer.findOrFail(params.id);
    await theCustomer.load("subscriptions");

    return theCustomer.subscriptions.map((s) => ({
      id: s.id,
      customer: s.customer_id,
      start_date: s.startDate,
      end_date: s.endDate,
      monthly_fee: s.monthlyFee,
      is_paid: s.isPaid,
    }));
  }
}

