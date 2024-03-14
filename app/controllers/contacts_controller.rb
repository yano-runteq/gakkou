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

  def create
  end

  def completed
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :content)
  end
end
