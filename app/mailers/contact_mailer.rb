class ContactMailer < ApplicationMailer
  def creation_mail(contact)
    @contact = contact
    mail(
      subject: "お問い合わせ",
      from: "#{@contact.email}",
      to: ENV["TOMAILADDRESS"]
    )
  end
end
