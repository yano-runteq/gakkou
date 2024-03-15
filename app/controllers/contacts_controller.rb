class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def check
    @contact = Contact.new(contact_params)
    if @contact.invalid?
      render :new
    end
  end

  def back
    @contact = Contact.new(contact_params)
    render :new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ContactMailer.creation_mail(@contact).deliver_now
      redirect_to completed_contacts_path
    else
      render :new
    end
  end

  def completed
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :content)
  end
end
