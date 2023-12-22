using System.Net.Mail;
using System.Net;
using AquaCars.Utility.Interfaces;
using Microsoft.Extensions.Options;
using SportsManagementSystem.Application.Utility.Options;

namespace AquaCars.Utility
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailOptions _options;
        public EmailSender(IOptions<EmailOptions> options)
        {
            _options = options.Value;
        }

        public async Task SendEmailAsync(string toAddress, string subject, string bodyMessage)
        {
            string fromMail = _options.FromMail;
            string fromPassword = _options.FromPassword;
            string host = _options.Host;
            int port = _options.Port;

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.To.Add(new MailAddress(toAddress));
            message.Subject = subject;
            message.Body = bodyMessage;
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient(host)
            {
                Port = port,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.SendMailAsync(message);
        }
    }
}
